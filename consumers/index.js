const filename = process.argv[2];
if (!filename) {
  console.error("Filename is required");
  process.exit(1);
}
require(`./${filename}`);
