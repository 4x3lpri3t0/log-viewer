module.exports = api => api.env('test') ? {
        presets: [
            "@babel/react",
            [ 
              "@babel/preset-env", 
              { 
                targets: "> 0.25%, not dead", 
                useBuiltIns: "usage",
              } 
            ],
        ]
    }

    : {}