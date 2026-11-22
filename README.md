# Gradients
Generating gradients by letting user choose color and positions.

## Distance
There are 4 distance algorithms that I have implemented. 
The way we use distance, is we take the distance from each source to each point. Now, since closer should be stronger influence, we rotate around the avg distance. This is the strength multiplier applied to the pixel's color components(rgb).

### Euclidean
Standard mathematical distance, the diagonal distance between 2 points. sqrt(a^2+b^2)
### Manhattan
More seen in programming and named after taxis in urban areas. The minimum distance if you can only move parallel to axes. abs(x-x1)+abs(y-y1)
### Chebyshev
Think of as the movement of a rook in chess. Your goal is to move minimum distance such that you are attacking the target square. min(x-x1, y-y1)
### Average Axis
I don't know how to relate this to real life, but it's just the average distance per axis. abs(x-x1)+abs(y-y1)/2
## Future additions
### More distance methods(chess themed)