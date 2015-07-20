require '00_static_array'
class CircularBuffer
  attr_reader :length, :store, :capacity
  def initialize
    self.store, self.capacity = Array.new(8), 8
    self.start_idx, self.length = 0, 0
  end

  def [](index)
    check_index(index)
    store[(start_idx + index) % capacity]
  end

  def []=(index, val)
    check_index(index)
    store[(start_idx + index) % capacity] = val
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

    val, self[0] = self[0], nil
    self.start_idx = (start_idx + 1) % capacity
    self.length -= 1

    val
  end

  def unshift(val)
    resize! if length == capacity

    self.start_idx = (start_idx - 1) % capacity
    self.length += 1
    self[0] = val
  end

  protected
  attr_accessor :start_idx
  attr_writer :store, :capacity, :length

  def check_index(index)
    unless (index >= 0) && (index < length)
      raise "index out of bounds"
    end
  end

  def resize!
    new_capacity = capacity * 2
    new_store = StaticArray.new(new_capacity)
    length.times { |i| new_store[i] = self[i] }

    self.capacity = new_capacity
    self.store = new_store
    self.start_idx = 0
  end
end
