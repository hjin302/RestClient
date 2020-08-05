/*--------------------------------------------------------
[object object] 형태의 json을 string으로 변환한뒤, 
다시 json 형태로 돌려놓는 함수
--------------------------------------------------------*/
function convertStringToJson(data){
    var str = JSON.stringify(data); //문자열화
    str = str.replace(/&#34;/gi, "\""); //기호를 문자로
    str = str.substring(1, str.length-1);//양끝단의 쌍따옴표를 제거
    return JSON.parse(str); //파싱
}