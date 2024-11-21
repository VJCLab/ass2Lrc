// 시간을 "00:00.00" 형식으로 변환하는 함수
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = (seconds % 60).toFixed(2);
    return `${String(minutes).padStart(2, "0")}:${remainingSeconds.padStart(
        5,
        "0"
    )}`;
}
// "00:00:03.48"와 같은 시간 문자열을 초로 변환
function parseTime(timeStr) {
    const [_, minutes, seconds] = timeStr.split(":");
    const [sec, ms] = seconds.split(".");
    return parseInt(minutes) * 60 + parseInt(sec) + parseInt(ms) / 100;
}
// 비어 있는 텍스트 라인 처리 (LRC 형식 변환)
async function processEmptyTextLine(startTime) {
    return Promise.resolve([`[${formatTime(parseTime(startTime))}] `]);
}

async function processTextWithKTags(text, startTime) {
    const regex = /\\k(\d+)([^\\]*)/g; // \k태그 추출
    let timeSegments = [];
    let currentTime = parseTime(startTime); // 시작 시간

    let lastIndex = 0;

    // \k 태그를 기준으로 글자별 타이밍 계산
    let match;
    while ((match = regex.exec(text)) !== null) {
        const duration = parseInt(match[1], 10); // \k 값 (밀리초)
        const word = match[2]; // 실제 텍스트

        // 각 글자의 타이밍을 계산하여 timeSegments에 추가
        timeSegments.push({
            start: currentTime,
            word: word.replace(/\}|\{/g, "").replace(/\nD.*$/gm, ""),
        });

        currentTime += duration / 1000; // 밀리초를 초 단위로 변환
        lastIndex = match.index + match[0].length;
    }

    // 나머지 텍스트 (마지막 \k 태그 이후의 텍스트)
    const remainingText = text.slice(lastIndex);
    if (remainingText.length > 0) {
        timeSegments.push({
            start: currentTime,
            word: remainingText.replace(/\nD.*$/gm, ""),
        });
    }

    // LRC 형식으로 변환
    return Promise.resolve(
        timeSegments.map(
            (segment) => `[${formatTime(segment.start)}] ${segment.word}`
        )
    );
}
/**
 * @type {RegExp} a regexp for qurring starttime and endtime and text.
 */
const dialogueRegex =
    /Dialogue:\s*(\d+),([\d:.]+),([\d:.]+),([^,]+),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),(.*)/g;

const author = [`[re: ASS2LRC_Converter (by vjcLab)]`];

/**
 * Converts ASS (AegisSub) format to LRC (Lyrics) format.
 * This method processes each dialogue line in the ASS text, extracts timing and text information,
 * and converts it to the corresponding LRC format.
 *
 * @param {String} assText - The input ASS formatted subtitle text.
 * @returns {Promise<String>} A promise that resolves to the LRC formatted lyrics as a single string.
 */
async function assToLrc(assText) {
    const lrcText = [];
    let match;

    // 각 Dialogue 라인 처리 (비동기적으로 처리)
    while ((match = dialogueRegex.exec(assText)) !== null) {
        const startTime = match[2].trim(); // 시작 시간
        const endTime = match[3].trim(); // 종료 시간
        const text = match[10].trim(); // 텍스트 내용

        // \k 태그 추출 및 시간 계산
        let timeSegments = text
            ? await processTextWithKTags(text, startTime, endTime) // 비동기 호출
            : await processEmptyTextLine(startTime); // 비동기 호출

        // LRC 형식으로 변환하여 lrcText 배열에 추가
        lrcText.push(...timeSegments);
    }

    // 결과 LRC 텍스트 반환
    return author.concat(lrcText).join("\n");
}
export default class AEGIS {
    /**
     * AegisSub 형식의 자막을 LRC 형식으로 변환합니다.
     * @param {String} str - 입력된 ASS 자막 텍스트
     * @returns {Promise<String>} 변환된 LRC 형식의 텍스트
     */
    static async parse(str) {
        if (str && str.includes("Aegisub")) return await assToLrc(str);
        return Promise.resolve(str);
    }
}
