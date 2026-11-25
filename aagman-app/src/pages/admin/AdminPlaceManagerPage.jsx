import React, { useEffect, useMemo, useState } from 'react';
import { contentService } from '../../services/contentService';
import { videoService } from '../../services/videoService';
import { useAdminAuth } from '../../context/AdminAuthContext';
import AdminDestinationModal from '../../components/admin/AdminDestinationModal';
import AdminFestivalModal from '../../components/admin/AdminFestivalModal';
import AdminVideoModal from '../../components/admin/AdminVideoModal';
import styles from './AdminPages.module.css';

export default function AdminPlaceManagerPage() {
  const { adminProfile } = useAdminAuth();
  const [destinations, setDestinations] = useState([]);
  const [festivals, setFestivals] = useState([]);
  const [videos, setVideos] = useState([]);
  const [selected, setSelected] = useState(null);
  const [linkedFestivalIds, setLinkedFestivalIds] = useState([]);
  const [destinationModalOpen, setDestinationModalOpen] = useState(false);
  const [festivalModalOpen, setFestivalModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [videoToEdit, setVideoToEdit] = useState(null);
  const [search, setSearch] = useState('');
  const [savingLinks, setSavingLinks] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const refresh = async () => {
    const [d, f, v] = await Promise.all([
      contentService.getAllDestinations(),
      contentService.getAllFestivals(),
      videoService.getAllVideos()
    ]);
    setDestinations(d);
    setFestivals(f);
    setVideos(v);
    if (selected) {
      const current = d.find(item => item.id === selected.id);
      if (current) setSelected(current);
    }
  };

  useEffect(() => {
    let active = true;
    const unsubContent = contentService.subscribe(({ destinations: d, festivals: f }) => {
      if (active) { setDestinations(d); setFestivals(f); }
    });
    const unsubVideos = videoService.subscribe(list => { if (active) setVideos(list); });
    Promise.all([
      contentService.getAllDestinations(),
      contentService.getAllFestivals(),
      videoService.getAllVideos()
    ]).catch(err => { if (active) setError(err.message); });
    return () => { active = false; unsubContent(); unsubVideos(); };
  }, []);

  useEffect(() => {
    let active = true;
    if (!selected) { setLinkedFestivalIds([]); return undefined; }
    contentService.getFestivalIdsForDestination(selected.id)
      .then(ids => { if (active) setLinkedFestivalIds(ids); })
      .catch(err => { if (active) setError(err.message); });
    return () => { active = false; };
  }, [selected?.id]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return destinations.filter(item =>
      !term || [item.name, item.marathiName, item.district, item.category].some(value => (value || '').toLowerCase().includes(term))
    );
  }, [destinations, search]);

  const linkedVideos = selected ? videos.filter(video =>
    video.destinationId === selected.id || video.destinationDbId === selected.dbId
  ) : [];

  const saveDestination = async data => {
    try {
      setError('');
      const saved = await contentService.saveDestination(data, adminProfile);
      setSelected(saved);
      setDestinationModalOpen(false);
      setMessage(`“${saved.name}” saved. Manage its associated festivals and videos below.`);
      await refresh();
    } catch (err) { setError(err.message); }
  };

  const saveFestival = async data => {
    try {
      setError('');
      const saved = await contentService.saveFestival(data, adminProfile);
      setFestivalModalOpen(false);
      await refresh();
      if (selected) {
        const next = [...new Set([...linkedFestivalIds, saved.id])];
        await contentService.setDestinationFestivals(selected.id, next);
        setLinkedFestivalIds(next);
      }
      setMessage(`Festival “${saved.name}” saved.`);
    } catch (err) { setError(err.message); }
  };

  const toggleFestival = id => {
    setLinkedFestivalIds(current => current.includes(id)
      ? current.filter(value => value !== id)
      : [...current, id]);
  };

  const saveFestivalLinks = async () => {
    if (!selected) return;
    setSavingLinks(true); setError(''); setMessage('');
    try {
      await contentService.setDestinationFestivals(selected.id, linkedFestivalIds);
      setMessage('Festival associations saved.');
    } catch (err) { setError(err.message); }
    finally { setSavingLinks(false); }
  };

  const saveVideo = async data => {
    try {
      setError('');
      if (data.id) await videoService.updateVideo(data.id, data, adminProfile);
      else await videoService.createVideo(data, adminProfile);
      setVideoModalOpen(false);
      setVideoToEdit(null);
      await videoService.getAllVideos();
      setMessage('Video record saved and linked to this destination.');
    } catch (err) { setError(err.message); }
  };

  const openNewVideo = () => {
    setVideoToEdit({
      destinationId: selected?.id || '',
      destinationName: selected?.name || '',
      district: selected?.district || 'Maharashtra',
      category: selected?.category || 'heritage'
    });
    setVideoModalOpen(true);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <div className={styles.titleArea}>
          <h1 className={styles.pageTitle}>Place Manager</h1>
          <span className={styles.pageSubtitle}>Manage a destination and its related festivals, photographs and videos from one workspace.</span>
        </div>
        <button className={styles.actionBtnPrimary} onClick={() => { setSelected(null); setDestinationModalOpen(true); }}>+ Create Place</button>
      </div>

      {message && <div className={styles.toastAlert} role="status">{message}</div>}
      {error && <div role="alert" style={{background:'#FEF2F2',color:'#991B1B',padding:'12px 16px',borderRadius:8,marginBottom:16}}>{error}</div>}

      <div style={{display:'grid',gridTemplateColumns:'minmax(260px, 0.85fr) minmax(0, 2fr)',gap:20,alignItems:'start'}}>
        <section className={styles.cardSection}>
          <div style={{padding:16}}>
            <input className={styles.searchInput} style={{width:'100%'}} placeholder="Search places..." value={search} onChange={e=>setSearch(e.target.value)} />
            <p style={{fontSize:13,color:'#64748B',marginBottom:0}}>{filtered.length} places</p>
          </div>
          <div style={{maxHeight:650,overflowY:'auto'}}>
            {filtered.length === 0 ? <p style={{padding:20,color:'#64748B'}}>No places yet. Create the first place to begin.</p> :
              filtered.map(item => (
                <button key={item.id} type="button" onClick={()=>setSelected(item)}
                  style={{display:'block',width:'100%',textAlign:'left',padding:'14px 16px',border:0,borderTop:'1px solid #E5EDF5',background:selected?.id===item.id?'#EFF6FF':'#fff',cursor:'pointer'}}>
                  <strong style={{display:'block',color:'#173B63'}}>{item.name}</strong>
                  <span style={{fontSize:12,color:'#64748B'}}>{item.district} · {item.category} · {item.status}</span>
                </button>
              ))
            }
          </div>
        </section>

        <section className={styles.cardSection} style={{padding:20}}>
          {!selected ? (
            <div style={{padding:'55px 20px',textAlign:'center',color:'#64748B'}}>
              <h2 style={{color:'#173B63'}}>Select a place to manage its content</h2>
              <p>Choose a destination from the list or create a new place.</p>
            </div>
          ) : (
            <>
              <div style={{display:'flex',justifyContent:'space-between',gap:12,alignItems:'flex-start',flexWrap:'wrap'}}>
                <div>
                  <h2 style={{margin:'0 0 5px',color:'#173B63'}}>{selected.name}</h2>
                  <p style={{margin:0,color:'#64748B'}}>{selected.district} · {selected.category} · {selected.status}</p>
                </div>
                <button className={styles.tableActionBtn} onClick={()=>setDestinationModalOpen(true)}>Edit place details</button>
              </div>

              <div style={{marginTop:24,paddingTop:20,borderTop:'1px solid #E5EDF5'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12,flexWrap:'wrap'}}>
                  <div><h3 style={{margin:'0 0 4px',color:'#173B63'}}>Associated festivals</h3><p style={{margin:0,fontSize:13,color:'#64748B'}}>Link existing festivals to this place, or create a new festival.</p></div>
                  <button className={styles.tableActionBtn} onClick={()=>setFestivalModalOpen(true)}>+ Create festival</button>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:8,marginTop:14}}>
                  {festivals.length===0 ? <p style={{color:'#64748B'}}>No festivals have been created yet.</p> :
                    festivals.map(festival=>(
                      <label key={festival.id} style={{display:'flex',gap:9,alignItems:'center',padding:10,border:'1px solid #DCE7F2',borderRadius:8}}>
                        <input type="checkbox" checked={linkedFestivalIds.includes(festival.id)} onChange={()=>toggleFestival(festival.id)} />
                        <span><strong>{festival.name}</strong><small style={{display:'block',color:'#64748B'}}>{festival.dates || festival.location || festival.status}</small></span>
                      </label>
                    ))
                  }
                </div>
                <button className={styles.actionBtnPrimary} style={{marginTop:14}} onClick={saveFestivalLinks} disabled={savingLinks}>{savingLinks?'Saving...':'Save festival associations'}</button>
              </div>

              <div style={{marginTop:24,paddingTop:20,borderTop:'1px solid #E5EDF5'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12,flexWrap:'wrap'}}>
                  <div><h3 style={{margin:'0 0 4px',color:'#173B63'}}>Place videos</h3><p style={{margin:0,fontSize:13,color:'#64748B'}}>YouTube videos linked to this destination.</p></div>
                  <button className={styles.tableActionBtn} onClick={openNewVideo}>+ Add video</button>
                </div>
                {linkedVideos.length===0 ? <p style={{color:'#64748B',marginTop:14}}>No videos linked to this place.</p> :
                  <div style={{display:'grid',gap:10,marginTop:14}}>
                    {linkedVideos.map(video=>(
                      <div key={video.id} style={{display:'flex',gap:12,alignItems:'center',padding:10,border:'1px solid #DCE7F2',borderRadius:8}}>
                        <img src={video.thumbnail} alt="" style={{width:84,height:54,objectFit:'cover',borderRadius:5}} />
                        <div style={{flex:1,minWidth:0}}><strong>{video.title}</strong><small style={{display:'block',color:'#64748B'}}>{video.isActive?'Active':'Inactive'} · {video.duration}</small></div>
                        <button className={styles.tableActionBtn} onClick={()=>{setVideoToEdit(video);setVideoModalOpen(true);}}>Edit</button>
                      </div>
                    ))}
                  </div>
                }
              </div>

              <div style={{marginTop:24,paddingTop:20,borderTop:'1px solid #E5EDF5'}}>
                <h3 style={{margin:'0 0 8px',color:'#173B63'}}>Publishing</h3>
                <p style={{margin:'0 0 12px',fontSize:13,color:'#64748B'}}>Place details are published using the existing destination workflow. Festival publication status remains independently controlled.</p>
                <span className={`${styles.badge} ${selected.status==='published'?styles.active:styles.draft}`}>{selected.status || 'draft'}</span>
              </div>
            </>
          )}
        </section>
      </div>

      <AdminDestinationModal isOpen={destinationModalOpen} onClose={()=>setDestinationModalOpen(false)} onSave={saveDestination} destinationToEdit={selected} />
      <AdminFestivalModal isOpen={festivalModalOpen} onClose={()=>setFestivalModalOpen(false)} onSave={saveFestival} />
      <AdminVideoModal isOpen={videoModalOpen} onClose={()=>setVideoModalOpen(false)} onSave={saveVideo} videoToEdit={videoToEdit} />
    </div>
  );
}
