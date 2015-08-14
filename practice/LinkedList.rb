require_relative "Link"
class LinkedList
  attr_reader :back, :front
  def initialize
    self.front = SentinalLink.new(:front)
    self.back = SentinalLink.new(:back)
    self.front.affix(self.back)
  end

  def empty?
    front.next == back
  end

  def push(val)
    link = Link.new(val)
    back.prefix(link)
    link
  end

  def pop
    raise "can't pop from empty list" if empty?

    link = back.prev
    link.remove
    link.val
  end

  def shift
    raise "can't shift from empty list" if empty?

    link = front.next
    link.remove
    link.val
  end

  protected
  attr_writer :front, :back
end
