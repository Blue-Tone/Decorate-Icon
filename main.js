document.addEventListener('DOMContentLoaded', onDeviceReady, false);

var canvasWidth = 256;
var canvasHeight = 256;

var fileBase;
var canvasBase;
var ctxBase;
var imgBase;

var file2;
var canvas2;
var ctx2;
var img2;

var canvas3;
var ctx3;
var img3;

var canvasTrans;
var ctxTrans;

/** DOM読込み完了時処理 */
function onDeviceReady() {
  console.log("start onDeviceReady()");

  fileBase = document.getElementById('file');
  canvasBase = document.getElementById('canvas');
  file2 = document.getElementById('file2');
  canvas2 = document.getElementById('canvas2');
  canvas3 = document.getElementById('canvas3');
  canvasTrans = document.getElementById('canvasTrans');

	// Canvasの準備
	canvasBase.width = canvasWidth;
	canvasBase.height = canvasHeight;
	ctxBase = canvasBase.getContext('2d');
	canvas2.width = canvasWidth;
	canvas2.height = canvasHeight;
	ctx2 = canvas2.getContext('2d');
	canvas3.width = canvasWidth;
	canvas3.height = canvasHeight;
  ctx3 = canvas3.getContext('2d');
	canvasTrans.width = canvasWidth;
	canvasTrans.height = canvasHeight;
  ctxTrans = canvasTrans.getContext('2d');

	// ファイルが指定された時にloadLocalImage()を実行
	fileBase.addEventListener('change', loadLocalImage, false);
	fileBase.ctx = ctxBase;
	fileBase.img = imgBase;
	file2.addEventListener('change', loadLocalImage, false);
	file2.ctx = ctx2;
	file2.img = img2;
}

// 画像ファイル読込み完了処理
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
    canvasDraw(reader.result, e.target.ctx, e.target);
    e.target.imageLoaded = true; // 画像読込み完了を保存
  }
  // ファイル読み込みを実行
  reader.readAsDataURL(fileData);
}

// Canvas上に画像を表示する
function canvasDraw(imgSrc, ctx, file) {
  // canvas内の要素をクリアする
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  // Canvas上に画像を表示
  file.img = new Image();
  file.img.src = imgSrc;
  file.img.onload = function() {
    console.log("start img.onload()");
    ctx.drawImage(file.img, 0, 0, canvasWidth, this.height * (canvasWidth / this.width));

    // Canvas上にテキストを表示
    //addText();
    
    // 画像が両方とも読み込み完了なら、合成する
    if(file.imageLoaded & file2.imageLoaded){
      console.log("loaded bose");
      overlayImage();
      // canvasを画像に変換
      var data = canvas3.toDataURL();

      // ダウンロードリンクを生成して出力
      var dlLink = document.createElement('a');
      dlLink.href = data;
      dlLink.download = 'image.png';
      dlLink.innerText = 'Download';
      dlLink.onClick="ga('send', 'event', 'download', 'click', 'overlayImage');";

      // 前のリンク削除
      var ele = document.getElementById('result').firstChild;
      if(ele)document.getElementById('result').removeChild(ele);
      
      // リンク追加
      document.getElementById('result').appendChild(dlLink);
    }
    console.log("end   img.onload()");
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
  ctx.fillText('ああああ', 80, 25);
}

// オーバーレイ 
function overlayImage(){
  // ベース画像追加
  var baseImg = ctxBase.getImageData(0, 0, canvasBase.width, canvasBase.height);
	ctx3.putImageData(baseImg, 0, 0);
  
  // 透過イメージ作成 
  var img2 = ctx2.getImageData(0, 0, canvas2.width, canvas2.height);
  var transImg = makeTransparentImg(img2, 50);

  // 透過イメージを一旦キャンバスに設定
  ctxTrans.putImageData(transImg, 0, 0);

  // キャンバスの透過イメージを合成
  ctx3.drawImage(canvasTrans, 0, 0);
}

// 透過イメージ作成 
// @param img : from ctx.getImageData()
// @return 透過設定したイメージ
function makeTransparentImg(img, alpha){
  //参考 https://www.patrick-wied.at/blog/how-to-create-transparency-in-images-with-html5canvas
  //var img = ctx.getImageData(0, 0, 500, 200);

	var imgData = img.data,
	length = imgData.length;
	// set every fourth value to alpha
	for(var i=3; i < length; i+=4){
		imgData[i] = imgData[i] * alpha/100;
	}
  img.data = imgData;
  return img;
}