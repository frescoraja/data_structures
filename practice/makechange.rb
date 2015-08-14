def makechange(coins, total, cache = {}, i = 0)
  return cache[[coins, total]] if cache[[coins, total]]
  if coins.include?(total)
    return [total]
  end
  if coins.none? { |coin| coin < total }
    return nil
  end

  coins.sort!.reverse!
  best_change = nil
  coins.each_with_index do |coin, idx|
    next if coin > total
    rem = total - coin
    maybe_change = makechange(coins.drop(idx), rem, cache, i)
    if maybe_change
      maybe_change = [coin] + maybe_change
      if best_change.nil? || maybe_change.length < best_change.length
        best_change = maybe_change
      end
    end
  end
  cache[[coins, total]] = best_change
end
