# ASS 파일에서 LRC 파일 KARAOKE 변환

이 프로젝트는 Aegisub 프로젝트 파일(ASS)을 LRC 파일 형식으로 변환하여 카라오케 콘텐츠를 생성하는 도구입니다.

## Aegisub 프로젝트 파일 (ASS)

Aegisub은 자막을 만들고 편집하는 데 사용되는 오픈 소스 소프트웨어입니다. ASS 파일은 Aegisub에서 생성된 자막 파일로, 다음과 같은 특징을 가집니다:

- **고급 자막 기능**: ASS 파일은 다양한 스타일, 효과 및 애니메이션을 지원합니다.
- **타임코드**: 각 자막의 시작과 끝 시간을 정의하여, 비디오와 동기화할 수 있습니다.
- **가사 표시**: 카라오케 스타일로 가사를 표시하는 데 필요한 정보를 포함할 수 있습니다.
#### `.ass` 파일예시
```.ass
[Script Info]
; Script generated by Aegisub 3.2.2
; http://www.aegisub.org/
Title: Default Aegisub file
ScriptType: v4.00+
WrapStyle: 0
ScaledBorderAndShadow: yes
YCbCr Matrix: None
PlayResX: 1280
PlayResY: 720

[Aegisub Project Garbage]
Audio File: Rainbow Cat.mp3
Video File: ?dummy:23.976000:40000:1280:720:47:163:254:
Video AR Value: 1.777778
Video Zoom Percent: 0.750000
Scroll Position: 27
Active Line: 40
Video Position: 3159

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Default,Arial,40,&H00FFFFFF,&H000000FF,&H00000000,&H00000000,0,0,0,0,100,100,0,0,1,2,2,2,10,10,10,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
Dialogue: 0,0:00:00.70,0:00:03.48,Default,,0,0,0,,{\k16}냐{\k34}냥{\k38}냥{\k17}냐 {\k17}냐{\k18}냥~ {\k16}냐{\k36}냥{\k37}냥{\k49}냐~♪

```
> [예시파일 다운로드](./example.ass)
## LRC 파일

LRC 파일은 가사와 함께 타임스탬프가 포함된 파일 형식으로, 주로 음악 플레이어에서 가사를 동기화하여 표시하는 데 사용됩니다. LRC 파일의 주요 특징은 다음과 같습니다:

- **타임스탬프**: 가사가 언제 표시될지를 정의하는 시간 정보를 포함합니다.
- **간단한 형식**: LRC 파일은 텍스트 기반으로 간단히 작성할 수 있어, 사용자가 쉽게 수정할 수 있습니다.

## 사용 방법

1. ASS 파일을 준비합니다. [예시파일 다운로드](./example.ass)
2. `index.html`을 실행하여 ASS 파일을 LRC 파일로 변환합니다.

## 요구 사항

- Chrome or Firefox (LTS version)
- Aegisub

## 기여

이 프로젝트에 기여하고 싶으시다면, 이슈를 제기하거나 풀 리퀘스트를 제출해 주세요.

## 라이센스

이 프로젝트는 MIT 라이센스에 따라 배포됩니다.