const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const products = require('../inventory/products.json');

const packageDefinition = protoLoader.loadSync('proto/purchase.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true,
});

const purchaseProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

// implementa os métodos do PurchaseService
server.addService(purchaseProto.PurchaseService.service, {
    BuyBook: (payload, callback) => {
        const productSelected = products.find((product) => product.id == payload.request.id);
        productSelected.quantity = productSelected.quantity - 1
        callback(null,
            productSelected
        );
    },
});

server.bindAsync('127.0.0.1:3003', grpc.ServerCredentials.createInsecure(), () => {
    console.log('Purchase Service running at http://127.0.0.1:3003');
    server.start();
});
