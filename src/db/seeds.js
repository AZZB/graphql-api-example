
export default async (env) => {
    if(env === 'test') { await run_test_seeds(); return; }
    if(env === 'dev') { await run_dev_seeds(); return; }
}

async function run_dev_seeds() {
    
}
 
async function run_test_seeds() {
    
}
  