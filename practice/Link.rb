class Link
  attr_accessor :val
  attr_reader :next, :prev
  def initialize(val)
    self.val = val
  end

  def remove
    self.prev.next, self.next.prev = self.next, self.prev
    self.next, self.prev = nil, nil
  end
  protected
  attr_writer :prev, :next
end

class SentinalLink < Link
  def initialize(side)
    self.side = side
  end

  def affix(link)
    raise "can't insert after the back sentinal link" if self.side == :back
    link.prev, link.next = self, self.next
    self.next.prev = link if self.next
    self.next = link
  end

  def prefix(link)
    raise "can't insert before the front sentinal" if self.side == :front
    link.prev, link.next = self.prev, self
    self.prev.next = link if self.prev
    self.prev = link
  end

  protected
  attr_accessor :side
end
