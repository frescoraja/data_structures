require_relative "LinkedList"
class LRUCache
  def initialize(max_size, &prc)
    @max_size = max_size
    @prc = prc || Proc.new{ |x| x }
    @links_hash = {}
    @linked_list = LinkedList.new
  end

  def [](key)
    if @links_hash.has_key?(key)
      link = @links_hash[key]
      link.remove
      @linked_list.push(link)
      return link.val
    end

    if @links_hash.count === @max_size
      link = @linked_list.shift
      @links_hash.delete(link.val)
    end

    val = @prc.call(key)
    link = Link.new(val)
    @links_hash[key] = @linked_list.push(link)
    val
  end

end
