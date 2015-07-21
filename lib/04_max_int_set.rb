class MaxIntSet
  attr_reader :count
  def initialize(max_value)
    self.store, self.count = Array.new(max_value, false), 0
  end

  def include?(value)
    store[value]
  end

  def insert(value)
    return false if include?(value)

    store[value] = true
    self.count += 1

    true
  end

  def remove(value)
    return false unless include?(value)

    store[value] = false
    self.count -= 1

    true
  end

  protected
  attr_accessor :store
  attr_writer :count
end
