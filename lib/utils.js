module.exports = {
  extend: function(obj, props) {
    for (var v in props) {
      obj[v] = props[v]
    }
    return obj
  }
}
