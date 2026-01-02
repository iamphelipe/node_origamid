export const routes = {
    GET: {
        '/': (req, res) => {
            res.end('Home')
        },
        '/produto/notebook': (req, res) => {
            res.end('Produtos - Notebook')
        }
    },
    POST: {
        '/produto': (req, res) => {
            res.end('Notebook Post')
        }
    } 
}