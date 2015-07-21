require '04_max_int_set'

describe MaxIntSet do
  it "starts out empty" do
    set = MaxIntSet.new(8)
    expect(set.count).to eq(0)
  end

  it "allows insertion/include?" do
    set = MaxIntSet.new(8)
    5.times { |i| set.insert(i) }
    expect(set.count).to eq(5)
    5.times { |i| expect(set.include?(i)).to eq(true) }
  end

  it "allows removal" do
    set = MaxIntSet.new(8)
    5.times { |i| set.insert(i) }xx
  end
end
