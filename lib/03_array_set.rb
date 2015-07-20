class ArraySet
  attr_reader :count
  def initialize
    self.count, self.store = 0, []
  end

  def include?(target)
    store.each do |el|
      return true if el == target
    end

    false
  end

  def insert(item)
    return false if include?(item)

    store << item
    self.count += 1

    true
  end

  def remove(item)
    store.each_with_index do |el, idx|
      next unless item == el
      store.delete_at(idx)
      self.count -= 1
      return true
    end

    false
  end

  protected
  attr_accessor :store
  attr_writer :count
end
