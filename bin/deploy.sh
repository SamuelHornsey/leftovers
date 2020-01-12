# install dependencies
npm install -g s3-deploy
npm install

# deployment
npm run clean
npm run build
s3-deploy './dist/**' --cwd './dist/' --region $AWS_REGION --bucket $AWS_S3_BUCKET