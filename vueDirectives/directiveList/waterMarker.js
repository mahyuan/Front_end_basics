/**
 *   <div v-waterMarker="{text:'lzg版权所有',textColor:'rgba(180, 180, 180, 0.4)'}"></div>
 */

function addWaterMarker(options) {
  const { text, parentNode, font, textColor, size } = options;
  const waterWidth = size || text.length * 16 * 2; // 默认为1.5倍字段大小 x 文案长度

  var canvas = document.createElement('canvas');
  parentNode.appendChild(canvas);
  canvas.width = 200;
  canvas.height = 150;
  canvas.style.display = 'none';

  var ctx = canvas.getContext('2d');
  ctx.rotate((-20 * Math.PI) / 180);
  ctx.font = font || '16px serif';
  ctx.fillStyle = textColor || 'rgba(180, 180, 180, 0.3)';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, canvas.width / 10, canvas.height / 2);

  parentNode.style.backgroundRepeat = 'repeat';
  parentNode.style.backgroundSize = waterWidth;
  parentNode.style.backgroundImage = 'url(' + canvas.toDataURL('image/pgc') + ')';
}

/**
 * text: 水印文案
 * font: 水印字体样式
 * textColor: 水印颜色
 * size: 水印文字宽度(高度自适应)
 */
const waterMarker = {
  inserted(el, binding) {
    const opts = binding.value;
    addWaterMarker({
      parentNode: el,
      text: opts.text,
      font: opts.font,
      textColor: opts.textColor,
      size: opts.size
    });
  }

};

export default waterMarker;
