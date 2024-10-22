import { exec } from 'child_process'

const filePath = process.argv.slice(-1)[0]

exec(`cursor ${filePath}`, (error, stdout) => {
  console.log(stdout)
  if (error) {
    process.exit(1)
  }
})
