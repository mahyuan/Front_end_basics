function createSquire(config) {
    var newSquare = { color: 'red', area: 100 };
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}
var SquireItem = createSquire({ color: 'green', width: 12 });
var mysSearch;
mysSearch = function (source, subString) {
    var reuslt = source.search(subString);
    return reuslt > -1;
};
/**
 * 继承接口
 */
