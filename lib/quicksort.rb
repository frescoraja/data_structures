# def partition(arr)
#   p_idx = 0
#   pivot = arr[p_idx]
#   (1...arr.length).each do |idx|
#     if arr[idx] < pivot
#       cur_el = arr[idx]
#       arr[p_idx + 1], arr[idx] = arr[idx], arr[p_idx + 1]
#       arr[p_idx] = cur_el
#       p_idx += 1
#     end
#   end
#   arr
# end
def partition (arr)
	p_idx = 0
	(1...arr.length).each do |idx|
		if arr[idx] < arr[p_idx]
			 arr[p_idx + 1], arr[idx] = arr[idx], arr[p_idx + 1]
			 arr[p_idx], arr[p_idx + 1] = arr[p_idx + 1], arr[p_idx]
		 	 p_idx += 1
		end
   end
	arr
end
