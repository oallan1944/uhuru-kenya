package com.allan.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.allan.model.Deal;

public interface DealRepository extends JpaRepository <Deal, Long> {

}
