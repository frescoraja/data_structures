require_relative "LinkedList"
class LRUCache
  def initialize(max_size)
    @max_size = max_size
    @links_hash = {}
    @linked_list = LinkedList.new
  end

  def insert(key, val)
    if @links_hash.has_key?(key)
      link = @links_hash[key]
      link.remove.val = val
      @linked_list.push(link)
      return link.val
    end

    if @links_hash.count === @max_size
      link = @linked_list.shift
      @links_hash.delete(link.val)
    end

    link = Link.new(val)
    @links_hash[key] = @linked_list.push(link)
    val
  end

end
