document.addEventListener('DOMContentLoaded', onDeviceReady, false);

var canvasWidth = 400;
var canvasHeight = 300;

var file;
var canvas;
var ctx;

var file2;
var canvas2;
var ctx2;

/** DOM読込み完了時処理 */
function onDeviceReady() {
  console.log("start onDeviceReady()");

	file = document.getElementById('file');
	canvas = document.getElementById('canvas');
	file2 = document.getElementById('file2');
	canvas2 = document.getElementById('canvas2');
	
	// Canvasの準備
	canvas.width = canvasWidth;
	canvas.height = canvasHeight;
	ctx1 = canvas.getContext('2d');
	canvas2.width = canvasWidth;
	canvas2.height = canvasHeight;
	ctx2 = canvas2.getContext('2d');

	// ファイルが指定された時にloadLocalImage()を実行
	file.addEventListener('change', loadLocalImage, false);
	file.ctx = ctx1;
	file2.addEventListener('change', loadLocalImage, false);
	file2.ctx = ctx2;
}

function loadLocalImage(e) {
    // ファイル情報を取得
    var fileData = e.target.files[0];

    // 画像ファイル以外は処理を止める
    if(!fileData.type.match('image.*')) {
        alert('画像を選択してください');
        return;
    }

    // FileReaderオブジェクトを使ってファイル読み込み
    var reader = new FileReader();
    // ファイル読み込みに成功したときの処理
    reader.onload = function() {
        // Canvas上に表示する
        canvasDraw(reader.result, e.target.ctx);
    }
    // ファイル読み込みを実行
    reader.readAsDataURL(fileData);
}

// Canvas上に画像を表示する
function canvasDraw(imgSrc, ctx) {
    // canvas内の要素をクリアする
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Canvas上に画像を表示
    var img = new Image();
    img.src = imgSrc;
    img.onload = function() {
        ctx.drawImage(img, 0, 0, canvasWidth, this.height * (canvasWidth / this.width));

        // Canvas上にテキストを表示
        //addText();

        // canvasを画像に変換
        var data = canvas.toDataURL();

        // ダウンロードリンクを生成して出力
        var dlLink = document.createElement('a');
        dlLink.href = data;
        dlLink.download = 'sample.png';
        dlLink.innerText = 'ダウンロード';
        document.getElementById('result').appendChild(dlLink);
    }
}

// Canvas上にテキストを表示する
function addText() {
    ctx.fillStyle = '#fdd000';
    ctx.fillRect(10, 10, 140, 30);

    ctx.font = "bold 20px 'MS Pゴシック'";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#002B69';
    ctx.fillText('株式会社TAM', 80, 25);
}