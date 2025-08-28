import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  IconButton
} from '@mui/material';
import CloseIconImg from '../assets/icons/close.png';

export default function InstructionsDialog({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ fontFamily: '"Runescape", sans-serif', position: 'relative' }}>
        Discovalot Bingo – Syyskuu 2025
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <img 
           src={CloseIconImg} 
           alt="Close" 
           width={24} 
           height={24}
         />
        </IconButton>
      </DialogTitle>
      <DialogContent
        dividers
        sx={{ fontFamily: '"Runescape", sans-serif', lineHeight: 1.5 }}
      >
        <Typography component="p" gutterBottom>
          Bingossa on 6 tiimiä. Jokaisella tiimillä on oma Discord-kanava, jonne laitatte
          kuvan saadusta bingo-tilestä. Kuvan voi ottaa miten haluaa, kunhan kuva on selkeä
          ja noudattaa kuvan ottamisen ohjeita.
        </Typography>

        <Typography fontWeight="bold" gutterBottom>
          Kuvien ottamisen ohjeet:
        </Typography>
        <Box component="ol" pl={2}>
          <li>Koko osrs clientti. (Ei tarvitse työpöytää, pvm, kellonaikaa yms)</li>
          <li>Kuvassa näkyy sinun osrs nimi</li>
          <li>
            Kuvassa näkyy 'Discovalot2025' (’Clan Events’ Plugin → Challenge Password:
            Discovalot2025)
          </li>
          <li>
            Mobilella saadut tilet: jos pelaat puhelimella tai tabletilla, ota screenshot
            jossa näkyy osrs-nimesi, aika ja pvm.
          </li>
          <li>
            Lähetä kuva tiimisi discord-kanavalle. Tiimisi kapteeni lähettää sen eteenpäin.
            Tilet merkataan verkkosivulle joka päivä, jonne päivittyy kaikkien tiimien pisteet.
          </li>
        </Box>

        <Typography fontWeight="bold" mt={2} gutterBottom>
          Bingon säännöt:
        </Typography>
        <Box component="ol" pl={2}>
          <li>
            Stäckäys (esim. clue cascade, Wintertodt, Guardians of the Rift, brimstone key …)
            kielletty. Kaikki dropit/tilet on ansaittava bingo-session aikana. Cluet ja reward-pullit
            myös.
          </li>
          <li>
            Dropit on saatava yksin tai toisten klaanilaisten kanssa. Klaanilaisen ei tarvitse
            olla bingossa mukana, kunhan on klaanilainen.
          </li>
        </Box>

        <Typography fontWeight="bold" mt={2} gutterBottom>
          Tilejen tulkinta:
        </Typography>
        <Typography component="p" gutterBottom>
          Epäselvissä tilanteissa tai tulkintakysymyksissä kysy, niin voidaan selkeyttää.
        </Typography>

        <Typography fontWeight="bold" mt={2} gutterBottom>
          Yleiset kysymykset:
        </Typography>
        <Box component="ol" pl={2}>
          <li>
            Onko totta, että bingon voittajatiimi saa mainetta, kunniaa ja naisia?
            <Box component="ol" pl={2}>
              <li>
                Vastaus: Kyllä on! Myös osallistumispotti jaetaan voittajatiimin kesken!
              </li>
            </Box>
          </li>
          <li>
            Mitä jos joku huijaa ja kerää etukäteen laatikoita tai avaimia?
            <Box component="ol" pl={2}>
              <li>
                Vastaus: Jos jää kiinni, niin käy huonosti. Jos ei jää kiinni, niin hävetä saa,
                että pitää 20 v vanhassa videopelissä huijata.
              </li>
            </Box>
          </li>
          <li>
            Mitä tarkoittaa Osk, Ky, Oy, Tmi ja Ab?
            <Box component="ol" pl={2}>
              <li>
                Vastaus: Osk = Osuuskunta; Ky = Kommandiittiyhtiö; Oy = Osakeyhtiö; Tmi =
                Toiminimi; Ab = Aktiebolag (ruotsalainen Oy).
              </li>
            </Box>
          </li>
        </Box>

        <Typography fontWeight="bold" mt={2} gutterBottom>
          Tiimit:
        </Typography>
        <Typography component="p" gutterBottom>
          1. Ookun Omenat Osk<br />
          2. MiQun Minionit Ky<br />
          3. Metallin Miehet Oy<br />
          4. Uloksen Ulosotto Tmi<br />
          5. Ipin Ipanat Ab<br />
          6. Lalon Laulajat Oyj
        </Typography>

        <Typography component="p" gutterBottom>
          Sinut lisätään automaattisesti tiimisi discord-kanavalle, jossa ei ole ketään muuta
          kuin tiimikaverisi. Voitte keskustella tai olla hiljaa. Ensisijaiset kysymykset
          tiimisi johtajalle, joka kysyy ylemmältä johtoportaalta.
        </Typography>

        <Typography component="p" gutterBottom>
          Discovalot<br />
          Metal Geezer
        </Typography>
      </DialogContent>
    </Dialog>
  );
}