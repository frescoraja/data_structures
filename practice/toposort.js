function Vertex (value, inVertices, outVertices) {
  this.value = value;
  this.inVertices = inVertices || [];
  this.outVertices = outVertices || [];
}

topoSort = function (vertices) {
  var queue = [],
      dependencies = {},
      sorted = [],
      curVertex;
  vertices.forEach(function (vertex) {
    if (vertex.inVertices.length === 0) {
      queue.push(vertex);
    }
    dependencies[vertex.value] = vertex.inVertices.length;
  });
  var val;
  while (queue.length > 0) {
    curVertex = queue.shift();
    for (var i = 0; i < curVertex.outVertices.length; i++) {
      val = curVertex.outVertices[i].value;
      dependencies[val]--;
      if (dependencies[val] === 0) {
        queue.push(curVertex.outVertices[i]);
      }
    }
    sorted.push(curVertex);
  }
  return sorted;
};

var v1 = new Vertex(7);
var v2 = new Vertex(5);
var v3 = new Vertex(3);
var v4 = new Vertex(11);
var v5 = new Vertex(8);
var v6 = new Vertex(2);
var v7 = new Vertex(9);
var v8 = new Vertex(10);

v1.outVertices = [v4, v5];
v2.outVertices = [v4];
v3.outVertices = [v5, v8];
v4.outVertices = [v6, v7, v8];
v5.outVertices = [v7];

v4.inVertices = [v1, v2];
v5.inVertices = [v1, v3];
v6.inVertices = [v4];
v7.inVertices = [v4, v5];
v8.inVertices = [v3, v4];

vertices = [v1, v2, v3, v4, v5, v6, v7, v8];

sorted = topoSort(vertices);
