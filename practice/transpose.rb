# in place transpose of square matrix
def sq_transpose(matrix)
  size = matrix.length
  for n in (0..size-2)
    for m in (n + 1..size - 1)
      matrix[n][m], matrix[m][n] = matrix[m][n], matrix[n][m]
    end
  end
  matrix
end

# crap
def transpose(matrix)
  rows = matrix.length
  cols = matrix.first.length
  if cols < rows
    cols, rows = rows, cols
  end
  rows.times do |r|
    col = r + 1
    while (col < cols)
      if matrix[col]
        matrix[r][col], matrix[col][r] = matrix[col][r], matrix[r][col]
      else
        matrix.push([matrix[r][col]])
        matrix[r][col] = nil
      end
      col += 1
    end
    matrix[r].compact!
  end
  matrix.map { |row| row.compact if row.compact.any? }.compact
end
p sq_transpose([[1, 2, 3],[4, 5, 6],[7, 8, 9]])
p transpose([[1,2,3,4], [5,6,7,8]])
p transpose([[1,2],[3,4],[5,6],[7,8]])
p transpose([[1,2,3,4],[5,6,7,8],[9,10,11,12]])
