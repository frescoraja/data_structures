def quicksort(arr, start = 0, len = arr.length - start)
  return arr[start..len + start] if len < 2
  raise "start index must be in array" unless start.between?(0, (arr.length - 1))
  raise "range exceeds length of array!" if start + len > arr.length

  pivot_idx = partition!(arr, start, len)
  quicksort(arr, start, pivot_idx - start)
  quicksort(arr, pivot_idx + 1, len - (pivot_idx + 1))

  return arr
end

def partition!(arr, start, len)
  end_idx = start + len - 1
  p_idx = start
  start_idx = start + 1
  while start_idx <= end_idx
	  if arr[start_idx] < arr[p_idx]
      arr[p_idx + 1], arr[start_idx] = arr[start_idx], arr[p_idx + 1]
      arr[p_idx], arr[p_idx + 1] = arr[p_idx + 1], arr[p_idx]
      p_idx += 1
     end
    start_idx += 1
  end

  return p_idx
end
