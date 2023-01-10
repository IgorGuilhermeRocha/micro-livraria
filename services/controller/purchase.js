const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('proto/purchase.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true,
});

const PurchaseService = grpc.loadPackageDefinition(packageDefinition).PurchaseService;
const client = new PurchaseService('127.0.0.1:3003', grpc.credentials.createInsecure());

module.exports = client;
