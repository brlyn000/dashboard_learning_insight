import pg from 'pg';
const { Client } = pg;

const client = new Client({
  connectionString: "postgresql://postgres.irmmkclzprcedtueekzd:NexalarDB%40123@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres"
});

async function testConnection() {
  try {
    console.log('🔍 Testing Supabase connection...');
    
    await client.connect();
    console.log('✅ Connected to Supabase!');
    
    const result = await client.query('SELECT NOW()');
    console.log('✅ Query successful!');
    console.log('📅 Server time:', result.rows[0].now);
    
    const tables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    console.log('📊 Tables in database:', tables.rows.length);
    tables.rows.forEach(row => console.log('  -', row.table_name));
    
  } catch (error) {
    console.error('❌ Connection failed!');
    console.error('Error:', error.message);
  } finally {
    await client.end();
  }
}

testConnection();
