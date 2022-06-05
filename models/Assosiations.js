import UsuarioModel from "../models/UsuarioModel.js";
import MiembroModel from "../models/MiembroModel.js";
import RolModel from "../models/RolModel.js";
import PruebaUsabilidadModel from "../models/PruebaUsabilidadModel.js";
import PerfilParticipanteModel from "./PerfilParticipanteModel.js";
import ParticipanteModel from "./ParticipanteModel.js";
import CuestionarioModel from "./CuestionarioModel.js";
import PreguntaModel from "./PreguntaModel.js";
import AlternativaModel from "./AlternativaModel.js";
import TareaModel from "./TareaModel.js";
import ObservacionModel from "./ObservacionModel.js";
import RespuestaModel from "./RespuestaModel.js";

const Assosiations = () =>{
    UsuarioModel.belongsTo(RolModel,{foreignKey: 'idRol'})
    RolModel.hasMany(UsuarioModel,{foreignKey:'idRol'})

    UsuarioModel.belongsToMany(PruebaUsabilidadModel, {through: MiembroModel,foreignKey:'idUsuario'})
    PruebaUsabilidadModel.belongsToMany(UsuarioModel, {through: MiembroModel,foreignKey:'idPruebaUsabilidad',as:'miembros'})
    UsuarioModel.hasMany(MiembroModel,{foreignKey: 'idUsuario'});
    MiembroModel.belongsTo(UsuarioModel,{foreignKey: 'idUsuario'});
    PruebaUsabilidadModel.hasMany(MiembroModel,{foreignKey: 'idPruebaUsabilidad'});
    MiembroModel.belongsTo(PruebaUsabilidadModel,{foreignKey: 'idPruebaUsabilidad'});

    PerfilParticipanteModel.belongsTo(PruebaUsabilidadModel,{foreignKey:'idPruebaUsabilidad'});
    PruebaUsabilidadModel.hasMany(PerfilParticipanteModel,{foreignKey:'idPruebaUsabilidad'});

    UsuarioModel.belongsToMany(PruebaUsabilidadModel, {through: ParticipanteModel,foreignKey:'idUsuario'})
    PruebaUsabilidadModel.belongsToMany(UsuarioModel, {through: ParticipanteModel,foreignKey:'idPruebaUsabilidad',as:'participantes'})
    UsuarioModel.hasMany(ParticipanteModel,{foreignKey: 'idUsuario'});
    ParticipanteModel.belongsTo(UsuarioModel,{foreignKey: 'idUsuario',as:'Usuario'});
    PruebaUsabilidadModel.hasMany(ParticipanteModel,{foreignKey: 'idPruebaUsabilidad'});
    ParticipanteModel.belongsTo(PruebaUsabilidadModel,{foreignKey: 'idPruebaUsabilidad'});

    ParticipanteModel.belongsTo(PerfilParticipanteModel,{foreignKey: 'idPerfil'});
    PerfilParticipanteModel.hasMany(ParticipanteModel,{foreignKey:'idPerfil'});
    ParticipanteModel.belongsTo(UsuarioModel,{foreignKey: 'idObservador',as:'Observador'});
    UsuarioModel.hasMany(ParticipanteModel,{foreignKey:'idObservador'});

    CuestionarioModel.belongsTo(PerfilParticipanteModel,{foreignKey: 'idPerfil'});
    PerfilParticipanteModel.hasMany(CuestionarioModel,{foreignKey:'idPerfil'});

    PreguntaModel.belongsTo(CuestionarioModel,{foreignKey:'idCuestionario'})
    CuestionarioModel.hasMany(PreguntaModel,{foreignKey:'idCuestionario'})

    AlternativaModel.belongsTo(PreguntaModel,{foreignKey:'idPregunta',as:'alternativas'})
    PreguntaModel.hasMany(AlternativaModel,{foreignKey:'idPregunta',as:'alternativas'})

    TareaModel.belongsTo(PerfilParticipanteModel,{foreignKey:'idPerfil'})
    PerfilParticipanteModel.hasMany(TareaModel,{foreignKey:'idPerfil'})

    ObservacionModel.belongsTo(TareaModel,{foreignKey:'idTarea'})
    TareaModel.hasMany(ObservacionModel,{foreignKey:'idTarea'})
    ObservacionModel.belongsTo(UsuarioModel,{foreignKey: 'idObservador',as:'Observador'});
    UsuarioModel.hasMany(ObservacionModel,{foreignKey: 'idObservador'})
    ObservacionModel.belongsTo(UsuarioModel,{foreignKey: 'idParticipante',as:'Participante'});
    UsuarioModel.hasMany(ObservacionModel,{foreignKey: 'idParticipante'})

    RespuestaModel.belongsTo(UsuarioModel,{foreignKey:'idParticipante'})
    UsuarioModel.hasMany(RespuestaModel,{foreignKey:'idParticipante'})
    RespuestaModel.belongsTo(PreguntaModel,{foreignKey:'idPregunta'})
    PreguntaModel.hasMany(RespuestaModel,{foreignKey:'idPregunta'})
    RespuestaModel.belongsTo(AlternativaModel,{foreignKey:'idAlternativa'})
    AlternativaModel.hasMany(RespuestaModel,{foreignKey:'idAlternativa'})
}

export default Assosiations