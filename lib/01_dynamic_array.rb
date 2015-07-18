require_relative "00_static_array"

class DynamicArray
  attr_reader :length
  def initialize
    self.store, self.capacity, self.length = StaticArray.new(8), 8, 0
  end

  def [](index)
    check_index(index)
    store[index]
  end

  def []=(index, value)
    check_index(index)
    store[index] = value
  end

  def pop
    raise "index out of bounds" if length < 1
    val, self[length - 1] = self[length - 1], nil
    self.length -= 1

    val
  end

  def push(val)
    resize! if length == capacity

    self.length += 1
    self[length - 1] = val

    nil
  end

  def shift
    raise "index out of bounds" if length < 1

    val = self[0]
    (1...length).each { |i| self[i - 1] = self[i] }
    self.length -= 1

    val
  end

  def unshift(val)
    resize! if length == capacity

    self.length += 1
    (length - 2).downto(0) { |i| self[i + 1] = self[i] }
    self[0] = val

    nil
  end

  protected
  attr_accessor :capacity, :store
  attr_writer :length

  def check_index(index)
    unless (index < length) && (index >= 0)
      raise "index out of bounds"
    end
  end

  def resize!
    new_capacity = capacity * 2
    new_store = StaticArray.new(new_capacity)
    length.times { |i| new_store[i] = i }

    self.capacity = new_capacity
    self.store = new_store
  end
end
