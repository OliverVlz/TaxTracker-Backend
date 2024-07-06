package com.tax.demo.services;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


//import org.springframework.security.crypto.password.PasswordEncoder;


import com.tax.demo.entities.UsuarioEntity;
import com.tax.demo.repositories.UsuarioRepository;

@Service
public class UsuarioService {
    @Autowired
    UsuarioRepository usuariorepository;

    public List<UsuarioEntity> getUsuarios(){
        return usuariorepository.findAll();
    }

    public Optional<UsuarioEntity> getUsuario(Long id){
        return usuariorepository.findById(id);
    }

    public UsuarioEntity ValidarLogin(String usuario, String password){
        System.out.println(usuariorepository.findByLogin(usuario, password));
        return usuariorepository.findByLogin(usuario, password);

    }

    public void insertaroactualizar(UsuarioEntity usuario){
        usuariorepository.save(usuario);
    }

    public void borrar(Long id){
        usuariorepository.deleteById(id);
    }
}
