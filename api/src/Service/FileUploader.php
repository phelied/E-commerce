<?php
    /* ----------------------------------------------------------------------------------------- */
    /* NAMESPACE */
    /* ----------------------------------------------------------------------------------------- */
    namespace App\Service;
    /* ----------------------------------------------------------------------------------------- */
    /* DEFAULTS */
    /* ----------------------------------------------------------------------------------------- */
    use Symfony\Component\HttpFoundation\File\Exception\FileException;
    use Symfony\Component\HttpFoundation\File\UploadedFile;
    use Symfony\Component\String\Slugger\SluggerInterface;
    use Symfony\Component\Filesystem\Filesystem;
    /* ----------------------------------------------------------------------------------------- */
    /* SERVICE */
    /* ----------------------------------------------------------------------------------------- */
    class FileUploader {
        private $targetDirectory;
        private $slugger;
        public function __construct(SluggerInterface $slugger) {
            return $this->slugger = $slugger;
        }
        public function upload(UploadedFile $file, string $path) {
            $this->targetDirectory = "../public/uploads/" . $path . "/";
            $originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $safeFilename = $this->slugger->slug($originalFilename);
            $filename = $safeFilename . "-" . uniqid() . "." . $file->guessExtension();
            $file->move($this->getTargetDirectory(), $filename);
            return $filename;
        }
        public function getTargetDirectory() {
            return $this->targetDirectory;
        }
        public function delete(string $paths) {
            $fileSystem = new FileSystem();
            $paths = explode(", ", $paths);
            foreach($paths as $picturePath) {
                $previousPicture = "../public" . $picturePath;
                if($fileSystem->exists($previousPicture)) {
                    $fileSystem->remove($previousPicture);
                } else {
                    return false;
                };
            };
            return true;
        }
    };
?>