// 1.6

// Question

// Given an image represented by an NxN matrix, where each pixel in the image
// is 4 bytes, write a method to rotate the image by 90 degrees. Can you do 
// this in place?

rotateImage = function (image, clockwise) {
    var rows = [];
    var row = image[0].length;

    while(row >= 0){
        var rotated = [];
        for(var i = 0; i < image.length; i++){
            rotated.push(image[i][row]);
        }
        rows.push(rotated);
        row--;
    }

    return rows;

}

displayImage = function(image) {
    for(var i = 0; i < image.length; i++){
        console.log(image[i].join(''));
    }
}

image = [['h','i',',',' ','m','y'],
         ['n','a','m','e',' ','&'],
         ['y','o','u','r','s',' '],
         ['i','s',' ','c','o','l'],];

displayImage(image);

image = rotateImage(image);

displayImage(image);