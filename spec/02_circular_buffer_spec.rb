require "02_circular_buffer"

describe CircularBuffer do
  it "starts out empty" do
    arr = CircularBuffer.new

    expect(arr.length).to eq(0)
    expect do
      arr[0]
    end.to raise_error("index out of bounds")
  end

  it "pushes and pops items" do
    arr = CircularBuffer.new
    5.times { |i| arr.push(i) }

    expect(arr.length).to eq(5)
    5.times { |i| expect(arr[i]).to eq(i) }

    4.downto(0) { |i| expect(arr.pop).to eq(i) }
    expect(arr.length).to eq(0)
  end

  it "shifts and unshifts items" do
    arr = CircularBuffer.new
    5.times { |i| arr.unshift(i) }

    expect(arr.length).to eq(5)
    5.times { |i| expect(arr[i]).to eq(4 - i) }

    4.downto(0) { |i| expect(arr.shift).to eq(i) }
    expect(arr.length).to eq(0)
  end

  it "raises error when shifting or popping when empty" do
    arr = CircularBuffer.new

    expect do
      arr.pop
    end.to raise_error("index out of bounds")

    expect do
      arr.shift
    end.to raise_error("index out of bounds")
  end

  it "sets an item at an index" do
    arr = CircularBuffer.new
    5.times { |i| arr.push(0) }
    5.times { |i| arr[i] = i }
    5.times { |i| expect(arr[i]).to eq(i) }
  end

  it "raises error when setting outside of range" do
    arr = CircularBuffer.new
    5.times { |i| arr.push(i) }

    expect do
      arr[5]
    end.to raise_error("index out of bounds")
  end

  describe "internals" do
    it "begins with capacity of 8" do
      arr = CircularBuffer.new
      expect(arr.send(:capacity)).to eq(8)
    end

    it "doubles capacity when filled" do
      arr = CircularBuffer.new
      store = arr.send(:store)

      8.times do |i|
        arr.push(i)

        expect(arr.send(:store)).to be(store)
        expect(arr.send(:capacity)).to eq(8)
      end
      #trigger resize
      arr.push(8)
      expect(arr.send(:capacity)).to eq(16)
    end

    it "shift/unshifts without O(n) copying" do
      arr = CircularBuffer.new

      allow(arr.send(:store)).to receive(:[]=).and_call_original
      8.times do |i|
        arr.unshift(i)
      end

      #should involve 8 sets to unshift, no more
      expect(arr.send(:store)).to have_received(:[]=).exactly(8).times
    end
  end
end
