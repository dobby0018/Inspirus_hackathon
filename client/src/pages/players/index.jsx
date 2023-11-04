import React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';
import AppHeader from '../../components/AppHeader';

const Section = styled(Box)(({ theme }) => ({
    ...theme.typography.body2,
    
    flex:1,
    height:"100%",
    textAlign: 'center',
    color: theme.palette.text.secondary,
    background:"#1b1b1b",
    maxHeight:"100%",
    overflowY:"auto"
}));

const itemData = [
    {
        name:"Gabby George",
        img:"https://assets.manutd.com/AssetPicker/images/0/0/19/12/1248490/PlayerProfile_Thumbnail_GG1695032972065.jpg"
    },
    {
        name:"Maya LeTissier",
        img:"https://assets.manutd.com/AssetPicker/images/0/0/19/9/1247497/4_Maya_LeTissier1694706434466.jpg"
    },
    {
        name:"Aoife Mannion",
        img:"https://assets.manutd.com/AssetPicker/images/0/0/19/8/1247470/5_Aoife_Mannion1694704981817.jpg"
    },{
        name:"Millie Turner",
        img:"https://assets.manutd.com/AssetPicker/images/0/0/19/8/1247473/21_Millie_Turner1694705823403.jpg"
    },
    
]

function PlayersPage() {
  return (
    <Section overflow={"hidden"}>
        <AppHeader />
        <Masonry columns={3} spacing={2} className='players-masonry'>
            {itemData.map((item, index) => (
            <div className='player' key={index}>
                <img
                srcSet={`${item.img}?w=162&auto=format&dpr=2 2x`}
                src={`${item.img}?w=162&auto=format`}
                alt={item.name}
                loading="lazy"
                style={{
                    borderBottomLeftRadius: 4,
                    borderBottomRightRadius: 4,
                    display: 'block',
                    width: '100%',
                }}
                />
                <p>{item.name}</p>
            </div>
            ))}
        </Masonry>
      </Section>
  )
}

export default PlayersPage