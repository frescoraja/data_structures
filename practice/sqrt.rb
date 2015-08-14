def sqrt(num)
  c = Float(num)
  epsilon = 1.0e-5
  t = c
  while ((t - c/t).abs > epsilon)
    t = (c/t + t) / 2.0
  end

  t
end


def sqrt_int(num)
  a = 1
  b = num

  while (a - b).abs > 1
    b = num / a
    a = (a + b) / 2
  end

  a
end
