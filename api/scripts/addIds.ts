import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://tmgyftiqghgiohzxayfm.supabase.co';
const SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtZ3lmdGlxZ2hnaW9oenhheWZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTM4NTM5MTYsImV4cCI6MTk2OTQyOTkxNn0.cqbNwehS3Kks0uQ6sNcGAddXR1AG5QRfDOaqBx5BX9A';

const client = createClient(SUPABASE_URL, SUPABASE_KEY);

const addIds = async () => {
    await client
    .from('timestamps')
    .update({ userId: '197030172375908353' })
    .eq('username', 'Skarbrand').throwOnError();

    await client
    .from('timestamps')
    .update({ userId: '253990003171000320' })
    .eq('username', 'Brandenator').throwOnError();

    await client
    .from('timestamps')
    .update({ userId: '222075108116660226' })
    .eq('username', 'Light').throwOnError();

    await client
    .from('timestamps')
    .update({ userId: '360142026278174730' })
    .eq('username', 'Mr Mama').throwOnError();

    await client
    .from('timestamps')
    .update({ userId: '223894646240051200' })
    .eq('username', 'Chromenter').throwOnError();

    await client
    .from('timestamps')
    .update({ userId: '255426730183884802' })
    .eq('username', 'scrubzz').throwOnError();

    await client
    .from('timestamps')
    .update({ userId: '226096299903156224' })
    .eq('username', 'Meri').throwOnError();

    await client
    .from('timestamps')
    .update({ userId: '376855930932822018' })
    .eq('username', 'Mechanic').throwOnError();

    
}

addIds();


