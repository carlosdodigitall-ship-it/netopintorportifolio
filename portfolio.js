import {createClient} from 'https://esm.sh/@supabase/supabase-js@2.57.0';
import {SUPABASE_URL,SUPABASE_KEY,BUCKET} from './supabase-config.js';
const db=createClient(SUPABASE_URL,SUPABASE_KEY);
const target=document.querySelector('#portfolio-gallery');
async function render(){const {data,error}=await db.from('portfolio_images').select('id,storage_path,caption,sort_order,portfolio_categories(name)').order('sort_order',{ascending:true}).order('created_at',{ascending:false});if(error){target.textContent='Não foi possível carregar a galeria.';return;}target.replaceChildren();if(!data.length){const p=document.createElement('p');p.textContent='Novas fotografias em breve.';target.append(p);return;}for(const item of data){const fig=document.createElement('figure'),img=document.createElement('img'),cap=document.createElement('figcaption');img.src=db.storage.from(BUCKET).getPublicUrl(item.storage_path).data.publicUrl;img.alt=item.caption||item.portfolio_categories?.name||'Trabalho de pintura';img.loading='lazy';cap.textContent=(item.portfolio_categories?.name||'Portfólio')+' • '+(item.caption||'Trabalho realizado');fig.append(img,cap);target.append(fig);}}
render();
