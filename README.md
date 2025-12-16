# Gradients
Generating gradients by letting user choose color and positions.
I did this using 2 algorithms, Euclidean and Manhattan.

#Euclidean
This is done using euclidean geometry to find the distance between 2 points (a^2+b^2=c^2)
Then, we use this to calculate distance from each source color to the current pixel.
However, since we need smaller distance -> greater multiplier, we rotate distance around average distance
Then to make the distance matter more, we added an exponent picker.


#Manhattan
This is done using manhattan distance between 2 points (a+b=c)
Then, we use this to calculate distance from each source color to the current pixel.
However, since we need smaller distance -> greater multiplier, we rotate distance around average distance
Then to make the distance matter more, we added an exponent picker.
