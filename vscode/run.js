import { exec } from 'child_process'

const filePath = process.argv.slice(-1)[0]

exec(`code ${filePath}`, (error, stdout) => {
  console.log(stdout)
  if (error) {
    process.exit(1)
  }
})
