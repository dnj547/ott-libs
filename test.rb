def hasTargetSum(arr,target)
  solution = []
  i=0
  j=1
  while i < arr.length
    while j < arr.length
      if arr[i] + arr[j] == target
        solution.push([arr[i],arr[j]])
      end
      j+=1
    end
    i+=1
    j=i+1
  end
  # puts solution.class
  puts solution
end

hasTargetSum([-1, 3, 8, 12, 4, 11, 7], 10) ## [[-1, 11], [3, 7]]
hasTargetSum([22, 19, 4, 6, 30, -6], 25) ## [[19, 6]]
