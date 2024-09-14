import os
from PIL import Image

# Specify the input and output folders
input_folder = './images'  # Folder with the images you want to compress
output_folder = './compressed'  # Folder to store the compressed images

# Ensure the output folder exists
os.makedirs(output_folder, exist_ok=True)

# Max size in bytes (1.8 MB)
max_size = 1.8 * 1024 * 1024

# Function to reduce file size
def compress_image(file_path, output_path):
    img = Image.open(file_path)
    file_name, file_extension = os.path.splitext(file_path)

    # For JPEG or JPG files
    if file_extension.lower() in ['.jpg', '.jpeg']:
        quality = 95  # Start with a high quality
        while os.path.getsize(output_path) > max_size and quality > 10:
            img.save(output_path, 'JPEG', quality=quality, optimize=True)
            quality -= 5  # Decrease quality in steps of 5
            print(f"Compressed {os.path.basename(file_path)} to {os.path.getsize(output_path) / 1024:.2f} KB with quality={quality}.")

    # For PNG files
    elif file_extension.lower() == '.png':
        img = img.convert('P')  # Convert to 'P' mode to reduce file size
        img.save(output_path, optimize=True)
        print(f"Compressed {os.path.basename(file_path)} to {os.path.getsize(output_path) / 1024:.2f} KB.")

# Iterate over all images and compress them
def compress_images_in_folder(input_folder, output_folder):
    for filename in os.listdir(input_folder):
        file_path = os.path.join(input_folder, filename)
        output_path = os.path.join(output_folder, filename)

        # Check for .png, .jpg, and .jpeg files
        if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            # Initial save before checking and adjusting size
            img = Image.open(file_path)
            img.save(output_path, optimize=True)
            
            # If the image is larger than 1.8 MB, apply compression
            if os.path.getsize(output_path) > max_size:
                compress_image(file_path, output_path)
            else:
                print(f"{filename} is already under the size limit.")

# Call the function to start the compression
compress_images_in_folder(input_folder, output_folder)