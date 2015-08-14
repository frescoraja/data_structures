require 'set'
require 'byebug'

def foursum(arr, target)
  two_sums = {}
  arr.length.times do |i|
    j = i + 1
    while j < arr.length - 1
      two_sums[[i,j]] = arr[i] + arr[j]
      j += 1
    end
  end

  two_sums.each do |x, sum|
    diff = target - sum
    two_sums.each do |y, sum2|
      if sum2 == diff
        if (x.none? { |el| y.include?(el) })
          idx1, idx2 = x
          idx3, idx4 = y
          puts "#{idx1}: #{arr[idx1]} , #{idx2}: #{arr[idx2]}"
          puts "#{idx3}: #{arr[idx3]} , #{idx4}: #{arr[idx4]}"
          puts "sum to #{target}"
          return true
        end
      end
    end
  end

  return false
end


puts foursum([1,6,-12,7, 8], 17)
puts foursum([1,6,0,-2,4,-5,3,2,10,-12,7, 8], 6)
puts foursum([1,6,0,-2,4,-5,3,2,10,-12,7, 8], 5)
puts foursum([1,6,0,-2,4,-5,10,-12,7, 8], -3)
puts foursum([1,6,0,-2,4,-5,10,-12,7, 8], 14)
