# first solution depends on sorting, so time complexity is in O(nlog(n))

def maxprod(arr)
  raise "array needs at least 3 elements" if arr.length < 3
  return arr.inject(&:*) if arr.length === 3
  arr.sort!
  if arr[1] < 0
    negs = arr[0] * arr[1] * arr[-1]
    pos = arr[-3..-1].inject(&:*)
    [negs, pos].max
  else
    arr[-3..-1].inject(&:*)
  end
end
