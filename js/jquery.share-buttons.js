// shareButtons
$.fn.shareButtons = function(options) {
	// 設定
	const url = location.href,
				title = $('title').text(),
				init = {
					buttons: ['twitter', 'facebook', 'line', 'hatena', 'pocket'],
					shape: 'flat', // 'flat', 'ios', 'circle'
					color: '#ffffff', // 'brand' or any color 
					backgroundColor: 'brand', // 'brand' or any color
					demo: false
				},
				html = {
					wrapper: '<div class="share-buttons"></div>',
					style: {
						before: '<style type="text/css">',
						after: '</style>'
					},
					button: '<div class="sb-button"></div>',
					a: '<a class="sb-link" href="#" target="_blank"></a>',
					svg: {
						before: '<svg class="sb-icon" x="0px" y="0px" viewBox="0 0 512 512">',
						after: '</svg>',
					},
				},
				icons = {
					twitter: {
						color: '#1da1f2',
						link: 'https://twitter.com/share?url=' + url + '&text=' + title,
						path: '<path d="M459.4,151.7c0.3,4.5,0.3,9.1,0.3,13.6c0,138.7-105.6,298.6-298.6,298.6c-59.5,0-114.7-17.2-161.1-47.1c8.4,1,16.6,1.3,25.3,1.3c49.1,0,94.2-16.6,130.3-44.8c-46.1-1-84.8-31.2-98.1-72.8c6.5,1,13,1.6,19.8,1.6c9.4,0,18.8-1.3,27.6-3.6c-48.1-9.7-84.1-52-84.1-103v-1.3c14,7.8,30.2,12.7,47.4,13.3c-28.3-18.8-46.8-51-46.8-87.4c0-19.5,5.2-37.4,14.3-53C87.4,130.9,165,172.5,252.1,177.1c-1.6-7.8-2.6-15.9-2.6-24c0-57.8,46.8-104.9,104.9-104.9c30.2,0,57.5,12.7,76.7,33.1c23.7-4.5,46.5-13.3,66.6-25.3c-7.8,24.4-24.4,44.8-46.1,57.8c21.1-2.3,41.6-8.1,60.4-16.2C497.7,118.3,479.8,136.8,459.4,151.7L459.4,151.7z"/>'
					},
					facebook: {
						color: '#3b5998',
						link: 'http://www.facebook.com/share.php?u=' + url,
						path: '<path d="M200.7,512V283H124v-91h76.7v-1.7C200.7,42.4,248.3,0,317.8,0c33.3,0,61.9,2.5,70.2,3.6V85h-48.2c-37.8,0-45.1,18-45.1,44.3V192H380l-11.7,91h-73.6v229"/>',
					},
					line: {
						color: '#00c300',
						link: 'https://social-plugins.line.me/lineit/share?url=' + url,
						path: '<path class="st0" d="M255.3,15.4c-141.1,0-256,93.2-256,207.7c0,102.7,91,188.7,214.1,205c30,6.4,26.6,17.5,19.7,57.7c-1.1,6.4-5.1,25.3,22.1,13.8c27.3-11.4,147.4-86.8,201.2-148.6c37.1-40.8,54.8-82.1,54.8-127.9C511.3,108.6,396.4,15.4,255.3,15.4zM164.8,284.3c0,2.9-2.2,5-5,5H88.2c-1.4,0-2.5-0.7-3.4-1.4c-0.9-0.9-1.4-2.1-1.4-3.4V172.9c0-2.9,2.2-5,5-5h17.9c2.9,0,5,2.2,5,5v88.5h48.8c2.6,0,4.9,2.4,4.9,5v17.8H164.8z M208.2,284.4c0,2.9-2.2,5-5,5h-17.9c-2.9,0-5-2.2-5-5V172.8c0-2.9,2.2-5,5-5h17.9c2.9,0,5,2.4,5,5V284.4z M331.8,284.4c0,2.9-2.2,5-5,5h-17.9c-1.7,0-3.3-0.9-4.1-2.1l-51.2-69v66.3c0,2.9-2.2,5-5,5h-17.9c-2.9,0-5-2.2-5-5V173c0-2.9,2.2-5,5-5h17.7c1.6,0,3.3,0.8,4.1,2.2l51.2,69v-66.3c0-2.9,2.2-5,5-5h17.9c2.9-0.1,5.1,2.2,5.1,4.9v111.6H331.8z M431.1,190.7c0,2.9-2.2,5-5,5h-48.8v18.8h48.8c2.9,0,5,2.2,5,5v18c0,2.9-2.2,5-5,5h-48.8v18.8h48.8c2.9,0,5,2.2,5,5v17.9c0,2.9-2.2,5-5,5h-71.8c-2.9,0-5-2.4-5-5V172.8c0-2.9,2.4-5,5-5h71.8c2.6,0,4.9,2.4,5,5V190.7z"/>'
				},
					hatena: {
						color: '#00A4DE',
						link: 'http://b.hatena.ne.jp/add?mode=confirm&url=' + url + '&title=' + title,
						path: '<g><path class="st0" d="M308.9,271.2c-17-19-40.7-29.7-70.9-31.9c27-7.3,46.5-18,58.9-32.5c12.4-14.5,18.4-33.4,18.4-57.6c0.3-17.7-4-35.3-12.4-50.9c-8.5-14.8-21-26.9-36-34.9c-13.7-7.5-30-13-49.2-16.1c-19.1-3.2-52.7-4.5-100.8-4.5H0v426.4h120.5c48.4,0,83.3-1.6,104.7-4.9c21.4-3.4,39.2-9,53.7-16.7c17.4-9,31.7-23,41.1-40.2c9.6-17.3,14.5-37.3,14.5-60.2C334.5,315.5,326,290.1,308.9,271.2z M108.1,137.2h25c28.9,0,48.3,3.3,58.2,9.8c9.9,6.6,14.8,17.8,14.8,33.8s-5.4,26.3-16,32.7c-10.5,6.4-30.2,9.4-58.9,9.4h-23.1L108.1,137.2L108.1,137.2z M207.2,381.7c-11.4,6.9-31,10.3-58.4,10.3h-40.7v-92.9h42.4c28.2,0,47.7,3.6,58,10.7c10.3,7.1,15.8,19.5,15.8,37.5s-5.6,27.6-17.3,34.5L207.2,381.7z"/><path class="st0" d="M457.9,361.2c-29.9,0-54.1,24.2-54.1,54.1s24.2,54.1,54.1,54.1c29.9,0,54.1-24.2,54.1-54.1c0,0,0,0,0,0C512,385.4,487.8,361.2,457.9,361.2z"/><rect x="411" y="42.7" class="st0" width="93.8" height="284.4"/></g>'
				},
					pocket: {
						color: '#ef4056',
						link: 'http://getpocket.com/edit?url=' + url + '&title=' + title,
						path: '<path d="M465.8,35.4H46.4C21.1,35.4,0,56.6,0,81.8v154.5c0,142.5,113.9,256.2,256.2,256.2c141.7,0,255.8-113.7,255.8-256.2V81.8C512,56.2,491.8,35.4,465.8,35.4z M280.7,342.3c-14.2,13.5-35.9,12.7-48.5,0C102.3,217.8,100.9,222.2,100.9,201.5c0-19.3,15.8-35.1,35.1-35.1c19.4,0,18.4,4.3,120.2,102.1c103.5-99.3,101.3-102.1,120.6-102.1c19.3,0,35.1,15.8,35.1,35.1C411.9,221.8,408.6,219.4,280.7,342.3L280.7,342.3z"/>'
					}
				};
	options = Object.assign(init, options);
	
	// 全体構造作成
	var $wrapper = $(html.wrapper),
			eachClass = (options.demo) ? 'share-buttons' + Math.floor(Math.random() * 9999) + ' ' : '';
	if (options.demo) {
		$wrapper.addClass(eachClass);
		eachClass = '.' + eachClass;
	}
	// ボタン形状追加
	$wrapper.addClass('sb-' + options.shape);
	
	// style作成
	var style = html.style.before,
			radius = (options.shape === 'ios') ? '22%': (options.shape === 'circle') ? '50%': '0';
	style += '.sb-button{display:inline-block;margin:5px;}';
	style += eachClass + '.sb-link{display:flex;background-color:black;width:50px;height:50px;align-items:center;justify-content:center;border-radius:' + radius + '}';
	style += '.sb-icon {width:50%;}';
	$.each(options.buttons, function(index, button) {
		if (icons[button]) {
			var bg = (options.backgroundColor === 'brand' || !options.backgroundColor) ? icons[button].color : options.backgroundColor,
					color = (!options.color) ? '#ffffff': (options.color === 'brand') ? icons[button].color : options.color;
			style += eachClass + '.sb-' + button + '{background-color:' + bg + ';}';
			style += eachClass + '.sb-' + button + ' path,' + eachClass + '.sb-' + button + ' rect{fill:' + color + ';}'
		}
	});
	style += html.style.after;
	$wrapper.prepend(style);
	
	// 各ボタン作成
	$.each(options.buttons, function(index, button) {
		if (icons[button]) {
			// ボタンdivを作成
			var $button = $(html.button);
			// リンクを作成
			$button.prepend(html.a);
			// リンクに処理
			$button.find('a')
				// href追加
				.attr('href', icons[button].link)
				// ブランドclassを追加
				.addClass('sb-' + button)
				// svgアイコンを追加
				.prepend(html.svg.before + icons[button].path + html.svg.after);
			// 構造に追加
			$wrapper.append($button);
		}
	});
	
	// 描画
	this.prepend($wrapper);
	
	// jQuery return
	return this;
};