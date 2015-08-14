#given two nodes in a BST, finds lowest common ancestor
class BSTNode
  attr_accessor :key, :val, :left, :right, :parent
  attr_reader :depth, :balance, :l_depth, :r_depth

  def initialize(key, val, left = nil, right = nil, parent = nil)
    @key, @val, @left, @right, @parent = key, val, left, right, parent
    @l_depth = @left ? @left.depth : 0
    @r_depth = @right ? @right.depth : 0
    @depth = [@l_depth, @r_depth].max + 1
    @balance = @r_depth - @l_depth
  end

  #mutable nodes
  def set!(key, val)
    case key <=> @key
    when 0
      @key = val
    when -1
      if @left
        @left.set!(key, val)
      else
        @left = BSTNode.new(key, val, nil, nil, self)
        if @balance < -1
          if @right.depth <= 0
            right_rotate!
          else
            left_rotate!
            right_rotate!
          end
        end
      end
    when 1
      if @right
        @right.set!(key, val)
      else
        @right = BSTNode.new(key, val, nil, nil, self)
        if @balance > 1
          if @left.depth >= 0
            left_rotate!
          else
            right_rotate!
            left_rotate!
          end
        end
      end
    end
  end

  #assuming immutable nodes
  def set(key, val)
    case key <=> @key
    when 0
      return BSTNode.new(@key, val, @left, @right, @parent)
    when 1
      if @right
        new_right = @right.set(key, val)
        new_node = BSTNode.new(@key, @val, @left, new_right, @parent)
        if new_node.balance > 1
          if @left.depth >= 0
            new_node = new_node.left_rotate
          else
            new_node = new_node.right_rotate.left_rotate
          end
        end
        return new_node
      else
        new_right = BSTNode.new(key, val, nil, nil, self)
        new_node = BSTNode.new(@key, @val, @left, new_right, @parent)
        return new_node
      end
    when -1
      if @left
        new_left = @left.set(key, val)
        new_node = BSTNode(@key, @val, new_left, @right, @parent)
        if new_node.balance < -1
          if @right.depth <= 0
            new_node = new_node.right_rotate
          else
            new_node = new_node.left_rotate.right_rotate
          end
        end
        return new_node
      else
        new_left = BSTNode.new(key, val, nil, nil, self)
        new_node = BSTNode.new(@key, @val, new_left, @right, @parent)
        return new_node
      end
    end
  end

  def get(key)
    case key <=> @key
    when 0
      @val
    when -1
      @left ? @left.get(key) : nil
    when 1
      @right ? @right.get(key) : nil
    end
  end

  def has_key?(key)
    case key <=> @key
    when 0
      true
    when -1
      @left ? @left.has_key(key) : false
    when 1
      @right ? @right.has_key(key) : false
    end
  end

  def right_rotate
    raise "no left child to rotate about" unless @left
    new_X = BSTNode.new(@key, @val, @left.right, @right)
    new_Y = BSTNode.new(@left.key, @left.val, @left.left, new_X, self)
  end

  def left_rotate
    raise "no right child to rotate about" unless @right
    new_X = BSTNode.new(@key, @val, @left, @right.left)
    new_Y = BSTNode.new(@right.key, @right.val, new_X, @right.right, self)
  end

  # def right_rotate!
  #   raise "no left child to rotate about" unless @left
  #   new_left = @left.right
  #   @left.right, @left.parent = self, @parent
  #
  #
  # end
  #
  # def left_rotate!
  #   raise "no right child to rotate about" unless @left
  #   new_right = @right.left
  #   @right.left = self
  #
  # end
  protected
  attr_writer :depth, :balance
end


class Node
  attr_accessor :val, :parent, :left, :right
  def initialize(val, parent = nil, left = nil, right = nil)
    @val, @parent, @left, @right = val, parent, left, right
  end

  def ==(other)
    @val == other.val
  end
end

# find lowest common ancestor in a BST. first find root, then iterate down
# branches depending on value of root
def lca(node1, node2)
  root = node1
  while (root.parent)
    return root if root.val == node2.val
    root = root.parent
  end

  while (root)
    return root if root.val >= [node1.val, node2.val].min && root.val <= [node1.val, node2.val].max
    root = root.right if root.val < [node1.val, node2.val].min
    root = root.left if root.val > [node1.val, node2.val].max
  end
end

def lca_rec(root, node1, node2)
  range = [node1.val, node2.val].sort
  return root if (range[0]..range[1]).include?(root.val)
  return lca_rec(root.left, node1, node2) if root.val > node1.val && root.val > node2.val
  return lca_rec(root.right, node1, node2) if root.val < node1.val && root.val < node2.val
  return nil
end
