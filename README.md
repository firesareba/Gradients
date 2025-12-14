# Gradients
Generating gradients by letting user choose color and positions.
Notes:
    Each pixel will be based on the 2(or more) origin colors
    Then to actually make the gradient there needs to be some sort of weightage based on the distance from the origin colors
    Since right now i am focusing on 2 color. gradients, we can place them in the top left and bottom right corners
    top left is (0, 0)
    bottom right is (300, 300)
    To make it actually weighted, we can look at diagonals? maybe?
    So the 0th diagonal only contains the top left origin pixel
    Then the first diagonal contains (0, 1) and (1, 0)
    So the diagonal # is x+y for each pixel
    To add weightage, we have to somehow make a greater diagonal be less of the top and more of the bottom origin
    KEY OBSERVATION: this will be in the format something_about_top-diagonal and something_about_bottom+diagonal
    Basically the greater the diagonal, the more of the bottom and less of the top we want
    top * (1-diagonal) + bottom * (0+diagonal)
Final approach(take 1):
    For each pixel in the form (x, y):
        diagonal = x + y
        pixel_color = top * (1-diagonal) + bottom * (0+diagonal) // done for each color(r, g, b)
        setPixel(x, y, pixel_color)
    //For now, the top and bottom will be hard coded. I will use the input thing later.
