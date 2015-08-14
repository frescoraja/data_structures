#!/usr/bin/env ruby

class Glob
  def match(pattern, filenames)
    filenames.select do |filename|
      matches?(pattern, filename)
    end
  end

  def matches?(pattern, string)
    i = 0
    j = 0
    while i < pattern.length && j < string.length
      if pattern[i] == string[j]
        i += 1
        j += 1
      elsif pattern[i] == "?"
        return matches?(pattern[i + 1..-1], string[j..-1]) || matches?(pattern[i + 1..-1], string[j + 1..-1])
      elsif pattern[i] == "*"
        while i < pattern.length && pattern[i] == "*"
          i += 1
        end
        if i == pattern.length
          return true
        else
          while j < string.length && string[j] != pattern[i]
            j += 1
          end
          if j == string.length
            return matches?(pattern[i..-1], string[j - 1..-1])
          end
        end
      else
        return false
      end
    end
    return true
  end
end

if __FILE__ == $0
  puts ["abcd", "dabc", "abc"] == Glob.new.match("?abc*", ["abcd", "dabc", "abc", "efabc", "eadd"])
  puts ["abcd", "dabc", "abc"] == Glob.new.match("?a**c*?", ["abcd", "dabc", "abc", "efabc", "eadd"])
  puts ["abcdef","abcdegf"] == Glob.new.match("abcde?f", ["abcdef", "abcdegf"])
  puts ["vakjkjkjkjkjkjkbbcdexxdx","abbcdexxx"] == Glob.new.match("?a**bb*c???*????de*xx?x", ["vakjkjkjkjkjkjkbbcdexxdx","abbcdexxx"])
end